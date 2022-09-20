import React from "react";

export default function ModalAction(props) { 
    
    //Modal de validation d'action pour afficher un titre, message, un bouton OK et un bouton annuler
    //props du modal à définir dans le parent : 
    //showModal (booleen), closeModal(fonction), title(string), message(string), action(string), doAction(function)

    // exemple : <ModalAction message="message" title="title" showModal={showModal} closeModal={()=>closeModal} action="Action" doAction={()=>closeModal}/>


    const showModal = props.showModal;
    const closeModal = props.closeModal();
    const doAction = props.doAction();


    if (showModal === true) {
    return (
    <>
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
        <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 relative flex flex-col w-full bg-black outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-10 text-center">
                  <h3 className="text-3xl font-semibold text-white text-center ">
                    {props.title}
                  </h3>
                  <button
                    className="p-1  ml-auto bg-transparent border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="bg-transparent text-white h-6 w-6 block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-white text-white text-center leading-relaxed">
                    {props.message}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-around p-10 ">
                  <button
                    className="btn-primary w-1/3"
                    type="button"
                    onClick={closeModal}
                  >
                    ANNULER
                  </button>
                  <button
                    className="btn-red w-1/3"
                    type="button"
                    onClick={doAction}
                  >
                    {props.action}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );}
  else { return null}
}
