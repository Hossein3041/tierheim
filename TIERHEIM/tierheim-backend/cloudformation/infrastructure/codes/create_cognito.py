import boto3
import cfnresponse

client = boto3.client('cognito-idp')

def handler(event, context):
    try:
        user_pool_name = event['ResourceProperties']['UserPoolName']
        tag_name = event['ResourceProperties']['TagName']
        account_id = event['ResourceProperties']['AccountId']

        user_pool_id = get_user_pool_id(user_pool_name)
        if event['RequestType'] == 'Create' or event['RequestType'] == 'Update':
            if not user_pool_id:
                user_pool_id, user_pool_client_id = create_user_pool(user_pool_name, tag_name, account_id)
            else:
                user_pool_client_id = get_user_pool_client_id(user_pool_id, user_pool_name)
            client.tag_resource(
                ResourceArn=f"arn:aws:cognito-idp:eu-central-1:{account_id}:userpool/{user_pool_id}",
                Tags={tag_name: tag_name}
            )
            cfnresponse.send(event, context, cfnresponse.SUCCESS, {"UserPoolId": user_pool_id, "UserPoolClientId": user_pool_client_id})
        elif event['RequestType']  == 'Delete':
            delete_user_pool(user_pool_id, tag_name, account_id)
            cfnresponse.send(event, context, cfnresponse.SUCCESS, {"Message": "Delete request received but no action taken."})
        else:
            cfnresponse.send(event, context, cfnresponse.FAILED, {"Message": f"Invalid request type."})
    except Exception as e:
        cfnresponse.send(event, context, cfnresponse.FAILED, {"Message": str(e)})


def get_user_pool_id(user_pool_name):
    try:
        user_pools = client.list_user_pools(MaxResults=60)
        for user_pool in user_pools['UserPools']:
            if user_pool['Name'] == user_pool_name:
                return user_pool['Id']
        return None
    except client.exceptions.ResourceNotFoundException:
        return None

def get_user_pool_client_id(user_pool_id, user_pool_name):
    try:
        user_pool_clients = client.list_user_pool_clients(UserPoolId=user_pool_id)
        for user_pool_client in user_pool_clients['UserPoolClients']:
            if user_pool_client['ClientName'] == user_pool_name:
                return user_pool_client['ClientId']
        return None
    except client.exceptions.ResourceNotFoundException:
        return None

def create_user_pool(user_pool_name, tag_name, account_id):
    create_user_pool_response = client.create_user_pool(
        PoolName=user_pool_name,
        Policies={
            "PasswordPolicy": {
                "MinimumLength": 8,
                "RequireUppercase": True,
                "RequireLowercase": True,
                "RequireNumbers": True,
                "RequireSymbols": True,
                "TemporaryPasswordValidityDays": 7
            }
        },
        DeletionProtection='INACTIVE',
        LambdaConfig={},
        AutoVerifiedAttributes=[
            "email"
        ],
        AliasAttributes=[
            "email",
            "preferred_username"
        ],
        VerificationMessageTemplate={
            "DefaultEmailOption": "CONFIRM_WITH_CODE"
        },
        UserAttributeUpdateSettings={
            "AttributesRequireVerificationBeforeUpdate": [
                "email"
            ]
        },
        MfaConfiguration="OFF",
        EmailConfiguration={
            "EmailSendingAccount": "COGNITO_DEFAULT"
        },
        UserPoolTags={},
        AdminCreateUserConfig={
            "AllowAdminCreateUserOnly": False
        },
        UsernameConfiguration={
            "CaseSensitive": True
        },
        AccountRecoverySetting={
            "RecoveryMechanisms": [
                {
                    "Priority": 1,
                    "Name": "verified_email"
                }
            ]
        },
        Schema=[
            {
                "Name": "sub",
                "AttributeDataType": "String",
                "DeveloperOnlyAttribute": False,
                "Mutable": False,
                "Required": True,
                "StringAttributeConstraints": {
                    "MinLength": "1",
                    "MaxLength": "2048"
                }
            },
            {
                "Name": "email",
                "AttributeDataType": "String",
                "DeveloperOnlyAttribute": False,
                "Mutable": True,
                "Required": True,
                "StringAttributeConstraints": {
                    "MinLength": "0",
                    "MaxLength": "2048"
                }
            },
            {
                "Name": "email_verified",
                "AttributeDataType": "Boolean",
                "DeveloperOnlyAttribute": False,
                "Mutable": True,
                "Required": False
            },
            {
                "Name": "role",
                "AttributeDataType": "String",
                "DeveloperOnlyAttribute": False,
                "Mutable": True,
                "Required": False,
                "StringAttributeConstraints": {
                    "MinLength": "0",
                    "MaxLength": "2048"
                }
            },
        ],
    )
    user_pool_id = create_user_pool_response['UserPool']['Id']
    create_user_pool_client_response = client.create_user_pool_client(
        UserPoolId=user_pool_id,
        ClientName=user_pool_name,
        GenerateSecret=False,
        RefreshTokenValidity=30,
        AccessTokenValidity=60,
        IdTokenValidity=60,
        TokenValidityUnits={
            "AccessToken": "minutes",
            "IdToken": "minutes",
            "RefreshToken": "days"
        },
        ReadAttributes=[
            "email",
            "email_verified",
        ],
        WriteAttributes=[
            "email"
        ],
        ExplicitAuthFlows=[
            "ALLOW_REFRESH_TOKEN_AUTH",
            "ALLOW_USER_PASSWORD_AUTH"
        ],
        AllowedOAuthFlowsUserPoolClient=False,
        PreventUserExistenceErrors="ENABLED",
        EnableTokenRevocation=True,
        EnablePropagateAdditionalUserContextData=False,
        AuthSessionValidity=5
    )
    client.create_group(
        GroupName='admin',
        UserPoolId=user_pool_id,
        Description='Group for admins.',
        Precedence=1
    )
    client.create_group(
        GroupName='user',
        UserPoolId=user_pool_id,
        Description='Group for users.',
        Precedence=1024
    )
    client.admin_create_user(
        UserPoolId=user_pool_id,
        Username="admin",
        UserAttributes=[
            {
                "Name": "email",
                "Value": "srba@sideklick.solutions"
            },
            {
                "Name": "email_verified",
                "Value": "true"
            }
        ],
        TemporaryPassword="Testtest1!",
        MessageAction="SUPPRESS"
    )
    client.admin_add_user_to_group(
        UserPoolId=user_pool_id,
        Username='admin',
        GroupName='admin'
    )
    return user_pool_id, create_user_pool_client_response['UserPoolClient']['ClientId']

def delete_user_pool(user_pool_id, tag_name, account_id):
    if user_pool_id:
        client.untag_resource(
            ResourceArn=f"arn:aws:cognito-idp:eu-central-1:{account_id}:userpool/{user_pool_id}",
            TagKeys=[tag_name]
        )
        tags = client.list_tags_for_resource(
            ResourceArn=f"arn:aws:cognito-idp:eu-central-1:{account_id}:userpool/{user_pool_id}",
        )
        if len(tags['Tags']) == 0:
            client.delete_user_pool(
                UserPoolId=user_pool_id
            )
