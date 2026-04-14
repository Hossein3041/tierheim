import json
import boto3
import cfnresponse

def lambda_handler(event, context):
    try:
        if event['RequestType'] == 'Delete':
            bucket_name = event['ResourceProperties']['BucketName']
            s3 = boto3.resource('s3')
            bucket = s3.Bucket(bucket_name)
            bucket.objects.all().delete()
        cfnresponse.send(event, context, cfnresponse.SUCCESS, {})
    except Exception as e:
        cfnresponse.send(event, context, cfnresponse.FAILED, {'Message': str(e)})
