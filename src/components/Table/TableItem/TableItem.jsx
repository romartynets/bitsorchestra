import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
import classes from './TableItem.module.scss';

export const TableItem = ({ title, author, category, isbn, id, handleDelete }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{author}</td>
      <td>{category}</td>
      <td>{isbn}</td>
      <td>
        <NavLink className={classes.editIcon} to={`/edit/${id}`}>
          <EditIcon />
        </NavLink>
        <DeleteIcon className={classes.deleteIcon} onClick={() => handleDelete(id)} />
      </td>
    </tr>
  );
}



