import axios from "axios";
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddUser = ({ onAdd }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleAdd = data => {
        console.log(data);
        axios
            .post("http://localhost:3004/users", { ...data, salary: +data.salary })
            .then(res => {
                onAdd(res.data);
                reset();
            });
    }

    return (
        <div>
            <h1>AddUser</h1>
            <form onSubmit={handleSubmit(handleAdd)}>
                {errors.name && <p style={{ color: "red" }}>Please fill name</p>}
                <label>name</label>
                <input
                    {...register("name", { required: true, validate: (value) => { return !!value.trim() } })}
                />
                {errors.surname && <p style={{ color: "red" }}>Please fill surname</p>}
                <label>surname</label>
                <input
                    {...register("surname", { required: true, minLength: 6, validate: (value) => { return !!value.trim() } })}
                />
                {errors.salary && <p style={{ color: "red" }}>Please fill salary</p>}
                <label>salary</label>
                <input
                    {...register("salary", { required: true, validate: (value) => { return !!value.trim() } })}
                />
                <button>save</button>
            </form>
        </div>
    );
}

AddUser.propTypes = {
    onAdd: PropTypes.func.isRequired,
}