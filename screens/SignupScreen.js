import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { authentication, db } from "../firebase/firebase";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error1, setError] = useState("");

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const reset = () => {
    setPassword("");
    setRepassword("");
  };

  function validatePassword() {
    if (password && repassword) {
      //user must enter a password with more than 8 chars, at least an uppercase, lowercase, special case and number
      if (password.length < 8) {
        setError("Please enter a password \nmore than 8 characters");
        reset();
        return false;
      } else if (!/^(?=.*[0-9])/.test(password)) {
        setError("Please enter a password \ncontaining at least one NUMBER");
        reset();
        return false;
      } else if (!/^(?=.*[A-Z])/.test(password)) {
        setError(
          "Please enter a password containing \nat least one UPPERCASE character"
        );
        reset();
        return false;
      } else if (!/^(?=.*[a-z])/.test(password)) {
        setError(
          "Please enter a password containing \nat least one LOWERCASE character"
        );
        reset();
        return false;
      } else if (!/^(?=.*[!@#$%^&*])/.test(password)) {
        setError(
          "Please enter a password containing \nat least one SPECIAL CASE"
        );
        reset();
        return false;
      } else if (password !== repassword) {
        setError("Please enter the SAME passwords!");
        reset();
        return false;
      }
    } else {
      setError("Password field is empty!");
      return false;
    }
    return true;
  }

  const checkValid = () => {
    return (
      firstName &&
      lastName &&
      phoneNum &&
      phoneNum.length == 8 &&
      validateEmail(email)
    );
  };

  const handleSignup = () => {
    //const auth = getAuth();
    if (checkValid() && validatePassword()) {
      /*sendEmailVerification(auth.currentUser).then(() => {
          Alert.alert("Email verification sent!");
        });*/

      createUserWithEmailAndPassword(authentication, email, password)
        .then(async (userCredentials) => {
          const user = userCredentials.user;
          await setDoc(doc(db, "users", user.uid), {
            email: email,
            fName: firstName,
            lName: lastName,
            phoneNum: phoneNum,
          }).catch((error) => {
            console.log(error);
          });
          //writeUserData();
          navigation.navigate("login");
        })
        .catch((error) => alert(error.message));
    } else {
      Alert.alert("Error", "Please enter valid information");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
      >
        <View>
          <TouchableOpacity
            style={styles.backbtn}
            onPress={() => navigation.navigate("login")}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="First Name"
              placeholderTextColor="black"
              onChangeText={(text) => setFirstName(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="Last Name"
              placeholderTextColor="black"
              onChangeText={(text) => setLastName(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="+65 Phone Number"
              placeholderTextColor="black"
              onChangeText={(text) => setPhoneNum(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="black"
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="black"
              value={password}
              onChangeText={(e) => setPassword(e)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              secureTextEntry={true}
              placeholder="Re-enter Password"
              placeholderTextColor="black"
              value={repassword}
              onChangeText={(e) => setRepassword(e)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {error1 && <Text style={styles.error}>{error1}</Text>}
          <TouchableOpacity style={styles.signupbutton} onPress={handleSignup}>
            <Text style={styles.signuptext}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    backgroundColor: "#A3A3BD",
    borderRadius: 15,
    width: 270,
    height: 50,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    padding: 13,
  },
  error: {
    textAlignVertical: "center",
    textAlign: "center",
    color: "red",
  },
  signupbutton: {
    width: 100,
    borderRadius: 15,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#171E4A",
    alignSelf: "center",
  },
  signuptext: {
    color: "white",
    fontWeight: "bold",
  },
  backbtn: {
    bottom: 120,
    right: 50,
  },
});
export default SignupScreen;