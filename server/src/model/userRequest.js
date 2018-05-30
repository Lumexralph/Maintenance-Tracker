// create a class for every request

class UserRequest {
  constructor(title, content, department = 'Maintenance') {
    this.title = title;
    this.department = department;
    this.content = content;
    this.requestStatus = 'accept';
    this.resolved = false;
    this.dateCreated = new Date().toDateString();
  }
}

export default UserRequest;
