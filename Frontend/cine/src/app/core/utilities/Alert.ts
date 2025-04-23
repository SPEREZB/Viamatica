import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const alertas = (titulo: any, mensaje: any, icon: any) => {
    MySwal.fire({
        title: titulo,
        text: mensaje,
        icon: icon,
        confirmButtonText: 'Aceptar',
      }); 
};

export default alertas;
 