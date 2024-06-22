import PropTypes from 'prop-types';

export const UserList = ({ users, onDelete, onSalaryUp }) => {
    return (
        <div>
            <h1>UserList</h1>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>surname</th>
                        <th>salary</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} style={{ backgroundColor: user.salary > 800000 ? 'lightgreen' : 'white' }}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.salary} AMD</td>
                            <td>
                                <button onClick={() => onDelete(user.id)}>Delete</button>
                                <button onClick={() => onSalaryUp(user)}>Salary Up</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

UserList.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            surname: PropTypes.string.isRequired,
            salary: PropTypes.number.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
    onSalaryUp: PropTypes.func.isRequired,
}
