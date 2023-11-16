import { useRef } from "react";

export const GalleryInput = (props) => {
  const fileInputRef = useRef();
  const formRef = useRef();

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });

    props.onChange(formData);

    formRef.current?.reset();
  };

  return (
    <form ref={formRef}>
      <div className="row g-2">
        
    <div className="col-2 ms-auto">
        <button
          type="button"
          className="bgdark"
          onClick={onClickHandler}
        >
          {props.label}
        </button>
        </div>
      </div>
      <input
        accept={props.acceptedFileTypes}
        multiple={props.allowMultipleFiles}
        name={props.uploadFileName}
        onChange={onChangeHandler}
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
      />
    </form>
  );
};
