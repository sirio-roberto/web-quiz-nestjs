export class ResponseEntity {
  success: boolean;
  feedback: string;

  constructor(success: boolean, feedback: string) {
    this.success = success;
    this.feedback = feedback;
  }
}
