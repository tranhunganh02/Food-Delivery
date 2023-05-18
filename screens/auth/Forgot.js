import { TextInput, View, Text, TouchableOpacity } from "react-native";
import AuthInput from "../../component/User/AuthInput";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
const Forgot = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const checkMail =async (data) => 
  {
    sendPasswordResetEmail(auth, data.email)
    .then(() => {
      // Password reset email sent!
      // ..
      alert("Check mail");
    })  
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert("email is not valid")
    });

  }
  return (
    <View>
      <AuthInput
        name="email"
        placeholder="Email"
        control={control}
        rules={{ required: "Email is required" }}
      />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <Text>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={{
            padding: 15,
            backgroundColor: "grey"
        }}
        onPress={handleSubmit(checkMail)}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Forgot;
