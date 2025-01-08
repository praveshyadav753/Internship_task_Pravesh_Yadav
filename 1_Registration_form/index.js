        const passwordField = document.getElementById('password');
        const submitButton = document.querySelector('button[type="submit"]');
        const requirements = {
            length: /^[\s\S]{8,}$/,
            uppercase: /[A-Z]/,
            lowercase: /[a-z]/,
            number: /[0-9]/,
            special: /[!@#$%^&*(),.?":{}|<>]/
        };

        passwordField.addEventListener('input', function() {
            let isValid = true;
            
            // Check each requirement
            for (const requirement in requirements) {
                const element = document.getElementById(requirement);
                if (requirements[requirement].test(passwordField.value)) {
                    element.classList.remove('requirement');
                    console.log("valid")
                    element.classList.add('valid');
                } else {
                    element.classList.remove('valid');
                    element.classList.add('requirement');
                    isValid = false;
                }
            }

            // Enable submit button if all conditions are met
            submitButton.disabled = !isValid;
        });
       
        const confirmPasswordField=document.getElementById('confirmPassword')
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        confirmPasswordField.addEventListener('input', function() {
            if (passwordField.value !== confirmPasswordField.value) {
                confirmPasswordError.style.display = 'block';
                confirmPasswordError.style.color = 'red';
                confirmPasswordField.classList.add('is-invalid');
            } else {
                confirmPasswordError.style.display = 'none';
                confirmPasswordField.classList.remove('is-invalid');
            }
        });

    const fullName = document.getElementById('full-name');
    const fullNameError = document.getElementById('fullNameError');

    const fullNameRegex = /^[A-Za-z\s]+$/;
    fullName.addEventListener('input', function() {
    if (fullNameRegex.test(fullName.value)) {
        fullNameError.style.display = 'None';
        isvalid = false;
    } 
    else {
        fullNameError.style.display = 'block';
        isvalid=true;
    }
    });
    // Date of Birth Validation: Check if valid date
    
    const dob = document.getElementById('dob');
    const dobError = document.getElementById('dobError');
    dob.addEventListener('input', function() {
        const dobValue = dob.value.trim(); 
      
        if (dobValue === '') {
          dobError.style.display = 'block'; 
          dobError.textContent = 'Please enter your Date of Birth.'; 
        } else {
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/; 
          if (!dateRegex.test(dobValue)) {
            dobError.style.display = 'block';
            dobError.textContent = 'Invalid date format. Please use YYYY-MM-DD.';
          } else { 
            const today = new Date();
            const dobDate = new Date(dobValue);
            if (dobDate > today) {
                dobError.style.display = 'block';
                dobError.textContent = 'Date of Birth cannot be in the future.';
            } else {
            dobError.style.display = 'none'; 
          }
        }
      }
    });
   

      // Email Validation: Check if valid email format
      const email = document.getElementById('email');
      const emailError = document.getElementById('emailError');
      email.addEventListener('input', function() {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email.value)) {
          emailError.style.display = 'block';
          valid = false;
      } else {
          emailError.style.display = 'none';
      }
    });


    //form submission and storage in local 

    document.getElementById("myForm").addEventListener("submit", function (event) {
    
        event.preventDefault();
    
        const formData = new FormData(this);
        const formObject = {};
    
        formData.forEach((value, key) => {
          formObject[key] = value;
        });
    
       
        localStorage.setItem("formResponse", JSON.stringify(formObject));
    
        alert("Form submitted successfully!");
        this.submit();
      });