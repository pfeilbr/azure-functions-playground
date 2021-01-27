# azure-functions-playground

learn [azure functions](https://docs.microsoft.com/en-us/azure/azure-functions).

Following is based on [Create a JavaScript function from the command line - Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-node?tabs=azure-cli%2Cbrowser)

```sh
# create nodejs function project
func init LocalFunctionProj --javascript

cd LocalFunctionProj

# create new function trigger via http request
func new --name HttpExample --template "HTTP trigger" --authlevel "anonymous"

# start locally
func start

# make request against local endpoint
curl http://localhost:7071/api/HttpExample?name=Brian

# create resource group
az group create --name "AzureFunctionsQuickstart-rg" --location "eastus"

# create storage account
az storage account create --name "brianpfeilmystorage01" --location "eastus" --resource-group "AzureFunctionsQuickstart-rg" --sku "Standard_LRS"

# create function app in azure
az functionapp create --resource-group "AzureFunctionsQuickstart-rg" --consumption-plan-location "eastus" --runtime "node" --runtime-version 12 --functions-version 3 --name "brianpfeilmyfn01" --storage-account "brianpfeilmystorage01"

# deploy
func azure functionapp publish "brianpfeilmyfn01"

# invoke function on azure
curl "https://brianpfeilmyfn01.azurewebsites.net/api/httpexample?name=Brianv2"

# view near real-time streaming logs
func azure functionapp logstream "brianpfeilmyfn01"

# fetch the app settings.  this populates them in `local.settings.json`
# credentials for the storage account are stored in the `AzureWebJobsStorage` property
# this is needed to store message in storage queue
func azure functionapp fetch-app-settings "brianpfeilmyfn01"
```

## Screenshots

message(s) in the azure storage queue

![](https://www.evernote.com/l/AAF4oT5-alVJf4FWuRgwVkGfjNm54yVrwBQB/image.png)

Managed Identity for Function in Azure Console

![](https://www.evernote.com/l/AAGjYBDl3URJ5JbtST8xTEQgGbSTSlwrGWoB/image.png)

## Notes

* app settings can be access via environment variables.  See [Configure function app settings in Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings?tabs=azurecli#settings)
* Use [Key Vault references](https://azure.microsoft.com/en-us/updates/general-availability-of-key-vault-references-in-app-service-and-azure-functions/) to store secrets stored in Key Vault.  They are automatically fetched and provided as environment variables to your function.
    * see [Secure App Settings variables in Azure Functions](https://zimmergren.net/azure-functions-key-vault-reference-azurewebjobsstorage/)
    * e.g. App Settings Value KeyVault Reference `@Microsoft.KeyVault(SecretUri=https://pfeilkeyvault01.vault.azure.net/secrets/secret01/e0fca4271fb243178a0a861d8e6fbc59)`
* Functions have in/out [bindings](https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings?tabs=csharp) defined in [`function.json`](LocalFunctionProj/HttpExample/function.json)
* To access other azure resources/services from a function, you configure a [managed identity](https://docs.microsoft.com/en-us/azure/app-service/overview-managed-identity?tabs=dotnet) on the function app and provide access to Azure resources for that identity using Azure role-based access control.  See [Azure Services that support managed identities - Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/services-support-managed-identities).
    * system-assigned managed identity - identity tied to and managed by a specific service.  when that service instance is deleted, the identity is deleted with it.
    * user-assigned managed identity - not owned by a specific service.  lifecycle is fully managed by you.  can be assigned to multiple services.
* [Azure Durable Functions documentation](https://docs.microsoft.com/en-us/azure/azure-functions/durable/) - lets you write stateful functions in a serverless compute environment.  Similar to AWS Step Functions, but implemented as language level library.
* shared access signature (SAS) URLs for granting limited access.  Similar to S3 signed URLs.  See [Grant limited access to data with shared access signatures (SAS) - Azure Storage](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview)
    > A shared access signature is a signed URI that points to one or more storage resources. The URI includes a token that contains a special set of query parameters. The token indicates how the resources may be accessed by the client. One of the query parameters, the signature, is constructed from the SAS parameters and signed with the key that was used to create the SAS. This signature is used by Azure Storage to authorize access to the storage resource.

## Resources

* [Triggers and bindings in Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings?tabs=csharp)
* [Create a JavaScript function from the command line - Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-node?tabs=azure-cli%2Cbrowser)
* [Azure Functions scale and hosting](https://docs.microsoft.com/en-us/azure/azure-functions/functions-scale) - covers limits and constraints
* [Using Managed Identity between Azure Functions and Azure Storage - Code Samples](https://docs.microsoft.com/en-us/samples/azure-samples/functions-storage-managed-identity/using-managed-identity-between-azure-functions-and-azure-storage/)
* [How to use managed identities for App Service and Azure Functions](https://docs.microsoft.com/en-us/azure/app-service/overview-managed-identity)
* [Configure function app settings in Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings?tabs=azurecli#settings)
* [Secure App Settings variables in Azure Functions](https://zimmergren.net/azure-functions-key-vault-reference-azurewebjobsstorage/)
* [Source Application Settings from Key Vault](https://docs.microsoft.com/en-us/azure/app-service/app-service-key-vault-references#source-application-settings-from-key-vault)