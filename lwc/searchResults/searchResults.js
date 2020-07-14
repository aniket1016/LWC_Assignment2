import { LightningElement, api, track, wire} from 'lwc';
import getAccounts from '@salesforce/apex/secondAssignController.getAccounts';
import { refreshApex } from "@salesforce/apex";	
import { registerListener, unregisterAllListeners } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";

export default class SearchResults extends LightningElement {

    @api typeValue;
    @track accounts;
    @track error;
    @track accountType;
    
    
    // Type value passesd by parent is stored in typeValue field and passed to getAccounts method of
    // apex controller to retrieve the accounts
    
    @wire(getAccounts , {accountType:'$typeValue'} ) wiredAccounts;
    @wire(CurrentPageReference) pageRef;

        connectedCallback() {
            registerListener("updateClicked", this.refreshAccounts, this);
          }
        
          refreshAccounts(accRecord) {
            refreshApex(this.wiredAccounts);
          }
        
          disconnectedCallback() {
            unregisterAllListeners(this);
          }
}