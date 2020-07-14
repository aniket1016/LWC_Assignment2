import { LightningElement,track,wire } from 'lwc';


export default class RootParent extends LightningElement {

     @track type;
    
    // Takes value of selected type field from child component picklistSearch and gives to html file for passing
    // same to another child component searchResult
    
    handleCustomEvents(event) {
        const typeVal = event.detail;
        this.type = typeVal;
    }
}