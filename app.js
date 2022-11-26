const registerBtn = document.querySelector(".register-button");

class Validator {
  constructor() {
    this.fields = [];
    this.formEl = document.querySelector(".register");
    this.signUp();
    // this.addFormField("#username");
    // this.addFormField("#email");
    // this.addFormField("#password");
    // this.addFormField("#confirm-password", "#password");
    this.processForm();
    console.log(this.fields);
  }

  signUp() {
    this.formEl.addEventListener("submit", (e) => {
      e.preventDefault();

      this.formValidator();
    });
  }

  processForm = () => {
    this.formEl.querySelectorAll("input").forEach((i) => {
      let minLength = i.getAttribute("minlength");
      if (!minLength) minLength = 3;
      let maxLength = i.getAttribute("maxlength");
      if (!maxLength) maxLength = 20;
      let cPassword = i.getAttribute("data-confirm-id");
      if (!cPassword) cPassword = undefined;

      this.addFormField(`#${i.id}`, "#password");
    });
  };

  addFormField = (selector, confirm) => {
    const formField = new FormField(selector, confirm);
    this.fields.push(formField);
  };

  formValidator = () => {
    const forms = this.fields.map((i) => i.validate());

    if (forms.includes(false)) {
      console.log("error");
    } else {
      console.log("fine");
      registerBtn.classList.add("reg");
      registerBtn.textContent = "Registered successfully";
    }
  };
}

class FormField {
  constructor(selector, confirmPasswordEl, errorSelector) {
    this.formField = document.querySelector(selector);
    this.type = this.formField.type;
    if (!errorSelector) errorSelector = `${selector} + span`;
    this.errorEl = document.querySelector(errorSelector);
    this.confirmPasswordEl = confirmPasswordEl;
  }

  validate = () => {
    switch (this.type) {
      case "password":
        if (!this.textLength()) return false;
        if (!this.invalidPassword()) return false;
        return true;
        break;
      case "text":
        if (!this.textLength()) return false;
        return true;
        break;
      case "email":
        if (!this.checkEmail()) return false;
        return true;
        break;
    }

    return false;
  };

  textLength = () => {
    if (this.formField.value.length < 3) {
      this.showError(`Please fill out this field`);
      return false;
    } else if (this.formField.value.length > 20) {
      this.showError(`Field must be 3-20 characters long`);
      return false;
    } else {
      this.showSuccess();
      return true;
    }
  };

  invalidPassword = () => {
    if (!this.confirmPasswordEl) return true;
    const password = document.querySelector(this.confirmPasswordEl);

    if (
      this.formField.value.length > 0 &&
      this.formField.value === password.value
    ) {
      this.showSuccess();
      return true;
    } else {
      this.showError(`The password confirmation does not match`);
      return false;
    }
  };

  checkEmail = () => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (re.test(this.formField.value.trim())) {
      this.showSuccess();
      return true;
    } else {
      this.showError(`Please enter a valid email address`);
      return false;
    }
  };

  showError = (msg) => {
    this.errorEl.innerHTML = msg;
    this.errorEl.classList.add("error");
    this.formField.classList.add("error");
    this.errorEl.classList.remove("success");
    this.formField.classList.remove("success");
  };

  showSuccess = () => {
    this.errorEl.innerHTML = "";
    this.errorEl.classList.remove("error");
    this.formField.classList.remove("error");
    this.errorEl.classList.add("success");
    this.formField.classList.add("success");
  };
}

const validator = new Validator();
