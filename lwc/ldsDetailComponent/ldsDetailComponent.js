import { LightningElement,wire, track, api } from 'lwc';

import pubsub from 'c/pubsub' ;
import { registerListener, unregisterAllListeners,fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import { updateRecord  } from 'lightning/uiRecordApi';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import ID_FIELD from "@salesforce/schema/Account.Id";
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import EMAIL_FIELD from "@salesforce/schema/Account.Email__c";
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import WEBSITE_FIELD from "@salesforce/schema/Account.Website";


export default class LdsDetailComponent extends LightningElement {

  @track account;
  @track accountValue;
  @track accountName;
  @track accountPhone;
  @track accountWebsite;
  @track accountIndustry;
  @track accountEmail;
  @track isEdit = false;
  @track isEdit1 = true;
  inputLabel;
  inputValue;

    @wire (CurrentPageReference) pageRef;
   // @track account;

    connectedCallback(){
        console.log('inside connectedcallback');
        registerListener("pubsubevent",this.handlePubsubEvent, this);
        console.log('inside connectedcallback after register');
    }

    handlePubsubEvent(inpVal){
        
    this.account = inpVal;
    this.accountName = this.account.Name;
    this.accountPhone = this.account.Phone;
    this.accountIndustry = this.account.Industry;
    this.accountWebsite = this.account.Website;
    this.accountEmail = this.account.Email__c;
    }

    handleChanges(event) {
        this.inputLabel = event.target.label;
        this.inputValue = event.target.value;
        if (
          this.inputLabel === "Account Name" &&
          this.inputValue !== null &&
          this.inputValue !== "" &&
          this.inputValue !== undefined
        )
          this.accountName = event.target.value;
        if (
          this.inputLabel === "Account Phone" &&
          this.inputValue !== null &&
          this.inputValue !== "" &&
          this.inputValue !== undefined
        )
          this.accountPhone = event.target.value;
        if (
          this.inputLabel === "Account Email" &&
          this.inputValue !== null &&
          this.inputValue !== "" &&
          this.inputValue !== undefined
        )
          this.accountEmail = event.target.value;
        if (
          this.inputLabel === "Account Industry" &&
          this.inputValue !== null &&
          this.inputValue !== "" &&
          this.inputValue !== undefined
        )
          this.accountIndustry = event.target.value;
        if (
          this.inputLabel === "Account Website" &&
          this.inputValue !== null &&
          this.inputValue !== "" &&
          this.inputValue !== undefined
        )
          this.accountWebsite = event.target.value;
      }

      updateAccountRecord() {
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.account.Id;
        fields[NAME_FIELD.fieldApiName] = this.accountName;
        fields[PHONE_FIELD.fieldApiName] = this.accountPhone;
        fields[WEBSITE_FIELD.fieldApiName] = this.accountWebsite;
        fields[EMAIL_FIELD.fieldApiName] = this.accountEmail;
        fields[INDUSTRY_FIELD.fieldApiName] = this.accountIndustry;
    
        const recordInput = { fields };
        console.log(recordInput);
    
        updateRecord(recordInput)
          .then(() => {
            console.log('Inside then updateRecord');
            this.dispatchEvent(
              new ShowToastEvent({
                
                title: "Success",
                message:
                  "Account Name " +
                  " " +
                  this.account.Name +
                  " " +
                  "has been updated successfully.",
                variant: "success"
              })
            );
    
            fireEvent(this.pageRef, "updateClicked", "ok");
          })
          .catch((error) => {
            console.log(error);
            this.dispatchEvent(
              new ShowToastEvent({
                title: "Updating error",
                message: error.body.message,
                variant: "error"
              })
            );
          });
    
        this.isEdit = false;
        this.isEdit1 = true;
      }

      cancelAccountRecord() {
        this.isEdit = false;
        this.isEdit1 = true;
      }

    displayDetails(){
        this.isEdit = true;
        this.isEdit1 = false;
    }

    disconnectedCallback(){
        unregisterAllListeners(this);
   }

    
}