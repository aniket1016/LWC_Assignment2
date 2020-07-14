import { LightningElement,wire, track,api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';
import TYPE_FIELD from '@salesforce/schema/Account.Type';



export default class PicklistSearch extends LightningElement {

        // Get picklist values of Account Type field
        
        @track value;
        @wire(getPicklistValues, {
            recordTypeId: '012000000000000AAA',
            fieldApiName: TYPE_FIELD,
        })
        picklistValues;

        // Function handling change in picklist value selection

        handleChange(event) {
            this.value = event.detail.value;
        }
        
        // Function passes selected value of picklist to parent component after clicking on search
        
        handleSearch(event){
        const type = this.value;
        console.log(type);
        const selectEvents = new CustomEvent('mycustomevents', {
            detail: type
        });
       this.dispatchEvent(selectEvents);
    }
}