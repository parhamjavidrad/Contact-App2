import { useContext, useEffect } from "react";
import ContactsContext from "./ContactsContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("نام را وارد کنید!"),
  email: yup.string().email("ایمیل نامعتبر است!").required("ایمیل را وارد کنید!"),
  job: yup.string().required("شغل را وارد کنید!"),
  phone: yup.string().required("شماره تلفن را وارد کنید!"),
});

function AddContactForm() {
  const { dispatch, editContact, setEditContact } = useContext(ContactsContext);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "", job: "", phone: "" }
  });

  useEffect(() => {
    if (editContact) {
      setValue("name", editContact.name || "");
      setValue("email", editContact.email || "");
      setValue("job", editContact.job || "");
      setValue("phone", editContact.phone || "");
    } else {
      reset();
    }
  }, [editContact, setValue, reset]);

  const onSubmit = (data) => {
    if (editContact) {
      dispatch({ type: "EDIT_CONTACT", payload: { ...editContact, ...data } });
      setEditContact(null);
    } else {
      dispatch({ type: "ADD_CONTACT", payload: data });
    }
    reset();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <input {...register("name")} placeholder="نام" />
        <p className="error-msg">{errors.name?.message}</p>
        <input {...register("email")} placeholder="ایمیل" />
        <p className="error-msg">{errors.email?.message}</p>
        <input {...register("job")} placeholder="شغل" />
        <p className="error-msg">{errors.job?.message}</p>
        <input {...register("phone")} placeholder="شماره تلفن" />
        <p className="error-msg">{errors.phone?.message}</p>
        <button type="submit">{editContact ? "ثبت ویرایش" : "افزودن"}</button>
        {editContact && (
          <button type="button" className="cancel-btn" onClick={() => setEditContact(null)}>
            لغو ویرایش
          </button>
        )}
      </form>
    </div>
  );
}

export default AddContactForm;
