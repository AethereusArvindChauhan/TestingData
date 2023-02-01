import { LightningElement,track,wire } from 'lwc';
import Id from '@salesforce/user/Id';
import getTimeOffEventsForInd from '@salesforce/apex/GetUpcomingAndClosedAppointments.getTimeOffEventsForInd';

export default class TimeOffClone extends LightningElement {

    tab1iconName;
    @track addButtonVisible = false;
    @track timeOffEvents;
    @track isShowModalnewAppointmt = false;
    @track buttonLabel = 'Show More';
    @track showMoreButtonVisible;
    @track timeOffEventList = [];
    count = 1;


 connectedCallback() {
        this.tab1iconName = "standard:event";
    }

  handleClick(event){
    this.addButtonVisible = true;  
  }
  handleSearchValue(event) {
    this.addButtonVisible = event.detail;
    console.log('addButtonVisible---------'+this.addButtonVisible);
  }

  @wire(getTimeOffEventsForInd, { userId: Id })
    timeOffAppointments({ error, data }) {
        if (data) {
            try {
                this.timeOffEventList = data;
                if(this.timeOffEventList.length > 5){
                this.showMoreButtonVisible = data;
                }
                this.timeOffEvents = [...this.timeOffEventList].splice(0,5);
                console.log('inside the If condition(data)--'+this.timeOffEvents);

            } catch (error) {
                console.error('check error here', error);
            }
        } else if (error) {
            console.error('check error here', error);
        }
        else{
            console.log('Inside the else Condition');
            this.closedEvents=[];
        }
    }
    hideModalBoxNewAppointmt() {  
    this.addButtonVisible = false;
}
showModalBoxConfirmAppointmt(){
    console.log('Inside the showModalBoxConfirmAppointmt');
    this.template.querySelector("c-mark-slots-as-unavailable-for-service-resource").handleClick();
}
handleshowMoreButtonClick(event){
            this.count = this.count+1;
            const label = event.target.label;
            if(label === 'Show More'){ 
                //this.buttonLabel = 'Show Less';
                this.timeOffEvents = [...this.timeOffEventList].splice(0,(5*this.count));
                if(this.showMoreButtonVisible.length <= 5*this.count){
                      this.buttonLabel = 'Show Less';
                      this.count = 0;
                 }
            }
            else if(label === 'Show Less'){ 
                this.buttonLabel = 'Show More';
                this.timeOffEvents = [...this.timeOffEventList].splice(0,5);
            }
                   
    }
}