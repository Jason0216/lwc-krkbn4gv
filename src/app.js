import { LightningElement,  wire, track, api } from 'lwc';
import getCodes from '@salesforce/apex/DHA_Add_Codes_Class_Manager.getCodes';

const Columns = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Short Description', fieldName: 'Short_Description__c', type: 'textArea'},
    { label: 'Body System', fieldName: 'Body_System__c', type: 'text'},
    { label: 'Note', fieldName: 'User_Input_Text__c', type: 'textArea'}, 
    ];

export default class SearchDataTable extends LightningElement {
    @track searchedData = [];
    @track codesAllData = [];
    @track searchString;
    codesColumns = Columns;
    
    connectedCallback() {
    getCodes()
        .then((result)=>{
            this.codesAllData = result;
        })
        .catch((error)=>{
            console.log('Error' + error);
        })
    }
    searchDataTable(event){
        var searchString =event.target.value.toUpperCase();
        var allRecords =   this.codesAllData;
        var searchResults =[];
        var i;
    
        for(i=0; i<allRecords.length; i++){
           if((allRecords[i].Name) && (allRecords[i].Name.toUpperCase().includes(searchString)) || 
               (allRecords[i].Short_Description__c) && (allRecords[i].Short_Description__c.toUpperCase().includes(searchString)) ||
               (allRecords[i].Body_System__c) && (allRecords[i].Body_System__c.toUpperCase().includes(searchString)) || 
               (allRecords[i].User_Input_Text__c) && (allRecords[i].User_Input_Text__c.toUpperCase().includes(searchString)) ){
                searchResults.push(allRecords[i]);
            }
        }
        this.searchedData = searchResults;
    }
}
