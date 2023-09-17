import {useForm} from "react-hook-form";

function FormValidation() {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const submit = (data) => {
        console.log(data);
    }

    return (
        <>
            <div className="container py-5">
                <div className="col-lg-6 jumbotron offset-lg-3">
                    <h2 className='text-dark'>React Hook Form | Form Validation</h2>
                    <hr/>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="form-group">
                            <input {...register('Firstname', {required: true, minLength: 5})}
                                   type="text"
                                   className='form-control'
                                   placeholder='Enter Firstname'/>
                            {errors.Firstname &&
                                <p className='text-danger'>This field is required. (Number of characters should be
                                    greater than 5)</p>}
                        </div>

                        <div className="form-group">
                            <input {...register('Lastname', {required: true, minLength: 5})}
                                   type="text"
                                   className='form-control'
                                   placeholder='Enter Lastname'/>
                            {errors.Lastname &&
                                <p className='text-danger'>This field is required. (Number of characters should be
                                    greater than 5)</p>}
                        </div>

                        <div className="form-group">
                            <input {...register('Password', {
                                required: true,
                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                            })}
                                   type="password"
                                   className='form-control'
                                   placeholder='Enter Password'/>
                            {errors.Password &&
                                <p className='text-danger'>Password should contain one Capital Letter, one Small Letter,
                                    and the number of characters should be between 6 to 15.</p>}
                        </div>

                        <div className="form-group">
                            <button type='submit'
                                    className='btn btn-outline-success'>Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default FormValidation;