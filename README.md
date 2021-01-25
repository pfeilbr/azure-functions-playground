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

message(s) in the azure storage queue

![](https://www.evernote.com/l/AAF4oT5-alVJf4FWuRgwVkGfjNm54yVrwBQB/image.png)

## Resources

* [Create a JavaScript function from the command line - Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-node?tabs=azure-cli%2Cbrowser)
* [Azure Functions scale and hosting](https://docs.microsoft.com/en-us/azure/azure-functions/functions-scale) - covers limits and constraints