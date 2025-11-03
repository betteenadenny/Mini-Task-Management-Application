const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const validateSignup = (req, res, next) => {
    const { name, email, password, confirm_password } = req.body; 
    console.log( confirm_password)

    if(!name || !email || !password || !confirm_password){
        return res.status(400).json({message:'All fields are required'});
    }

    if(name.length > 20){
        return res.status(400).json({ message: 'Name cannot be more than 20 characters long' });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    if(password !== confirm_password){
        return res.status(400).json({message:'Password and confiirm password do not match'})
    }    
    
    next();
};

const validateLogin = (req,res,next) => {
    const {email,password} = req.body;

    if(!email || !password ){
        return res.status(400).json({message:'All fields are required'});
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    next();
}

const validateTask = (req,res,next) => {
    const{title,description,deadline} = req.body;
    console.log(title)

    if(!title || !description || !deadline){
      return res.status(400).json({message:'All fields are required'});
    }

    if(description.trim().length < 10 || description.trim().length > 200){
        return res.status(400).json({message:'Description must be between 10 and 200 characters'});
    }

    const deadlineDate = new Date(deadline);
    const currentDate = new Date();

    if(deadlineDate < currentDate){
        return res.status(400).json({message:'Deadline has already passed'});
    }
    next();
}

module.exports = {validateSignup, validateLogin, validateTask, validateEmail}
