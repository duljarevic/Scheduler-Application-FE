export class InteractionObject {
  actionType: string;
  object: any;
  className: string;


  constructor(actionType: string, object: any, className: string) {
    this.actionType = actionType;
    this.object = object;
    this.className = className;
  }

}
