class User {
  constructor(firstName, lastName, mail, phone, matricule, workSite, password, createdDate) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.mail = mail;
    this.phone = phone;
    this.matricule = matricule;
    this.workSite = workSite;
    this.password = password;
    this.preferenceLabels = null;
    this.carDto = null;
    this.createdDate = createdDate;

  }
}

export default User;
