public class secondAssignController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String accountType){
        
        accountType = '%' + accountType + '%';
        return [select Id,Name,type,Email__c,Industry,site,Website from Account where Type LIKE :accountType];
    }
}