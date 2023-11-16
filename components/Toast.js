// import { useEffect } from 'react'

// const Toast = ({message,type}) => {

//     const invoke = ()=>{
//         if (typeof document !== undefined) {
//           // load JS bootstrap dependency
//           let bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js')
//         var toastElList = [].slice.call(document.querySelectorAll('.toast'))
//         var toastList = toastElList.map(function (toastEl) {
//           return new bootstrap.Toast(toastEl)
//         })
//         toastList.forEach( function(element, index) {
//           element.show()
//         })
//       }
//       }
//       useEffect(() => {
//           invoke();
//       }, [])
//     return (
//         <>
//         <div className="position-fixed bottom-0 end-0 p-3" style={{"zIndex":"11"}}>
//         <div
//           className={`toast align-items-center text-white bg-${type} border-0`}
//           role="alert"
//           aria-live="assertive"
//           aria-atomic="true"
//         >
//           <div className="d-flex">
//             <div className="toast-body">
//               {message}
//             </div>
//             <button
//               type="button"
//               className="btn-close btn-close-white me-2 m-auto"
//               data-bs-dismiss="toast"
//               aria-label="Close"
//             />
//           </div>
//         </div>
//         </div>   
//         </>
//     )
// }

// export default Toast
