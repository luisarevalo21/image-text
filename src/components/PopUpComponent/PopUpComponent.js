import React from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

// const popUpComponent = props => {
//   console.log("progress is", props.progress);
//   return (
//     <MDBContainer>
//       {/* <MDBBtn>Modal</MDBBtn> */}
//       <MDBModal isOpen={props.posting} toggle={props.handleToggle}>
//         <MDBModalHeader>MDBModal title</MDBModalHeader>
//         <MDBModalBody>
//           <div>TESTING ITS WORKING </div>
//           {/* {props.progress >= 100 ? (
//             <div>
//               <p>completed</p>
//               <MDBBtn color="secondary" onClick={props.reset}>
//                 Submit Another
//               </MDBBtn>
//               <MDBBtn color="primary" onClick={props.completed}>
//                 Finished
//               </MDBBtn>
//             </div>
//           ) : (
//             <>
//               <h3>Sending data...</h3>
//               <progress
//                 className="uploadProgress"
//                 value={props.progress}
//                 max="1.0"
//               />
//             </>
//           )} */}
//         </MDBModalBody>
//       </MDBModal>
//       {/* <MDBBtn>Modal</MDBBtn>
//       <MDBModal>
//         <MDBModalHeader>MDBModal title</MDBModalHeader>
//         <MDBModalBody>(...)</MDBModalBody>
//         <MDBModalFooter>
//           <MDBBtn color="secondary">Close</MDBBtn>
//           <MDBBtn color="primary">Save changes</MDBBtn>
//         </MDBModalFooter>
//       </MDBModal> */}
//     </MDBContainer>
//   );
// };

const popUpComponent = props => {
  console.log("props.posting", props.progress);
  return (
    <MDBContainer>
      <MDBModal isOpen={props.posting}>
        <MDBBtn> Modal</MDBBtn>
        <MDBModalHeader>MDBModal title</MDBModalHeader>
        <MDBModalBody>
          {props.progress >= 100 ? (
            <div>
              <p>completed</p>
              {/* <MDBBtn color="secondary" onClick={props.reset}>
                Submit Another
              </MDBBtn> */}
              <MDBBtn color="primary" onClick={props.completed}>
                Finished
              </MDBBtn>
            </div>
          ) : (
            <>
              <h3>Sending data...</h3>
              <progress
                className="uploadProgress"
                value={props.progress}
                max="1.0"
              />
            </>
          )}
        </MDBModalBody>
        {/* <MDBModalFooter>
          <MDBBtn color="secondary">Close</MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter> */}
      </MDBModal>
    </MDBContainer>
  );
};

export default popUpComponent;
{
  /* <MDBModalFooter>
          <MDBBtn color="secondary">Close</MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter> */
}
