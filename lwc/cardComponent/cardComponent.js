import { LightningElement, api, wire, track} from 'lwc';

import pubsub from 'c/pubsub' ;
import { fireEvent } from 'c/pubsub' ;
import { CurrentPageReference } from 'lightning/navigation';

export default class CardComponent extends LightningElement {

    // Stores instances of account passed from parent component
    @api account;
    //@api recordId;
    
    
    

    @wire (CurrentPageReference) pageRef;

   displayDetails(event){
       console.log('inside button')
       //let recordId = {"recordId" : account.id};
       //console.log(recordId);
      // const result = this.account;
      // console.log(result);
      // var recordId = this.account.id;
      // console.log(recordId);
       fireEvent(this.pageRef,'pubsubevent',this.account);
       console.log('inside botton after fire');
    }

    
}