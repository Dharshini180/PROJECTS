import { StatusBar } from 'expo-status-bar';
import { useEffect,useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [otp, setOtp] = useState('')
  const [otpText, setOtpText] = useState('')
  const [verificationResult, setVerificationResult] = useState('')
  const [timer, setTimer] = useState(30);
  const [otpInputDisabled, setOtpInputDisabled] = useState(false);
  const [verifyButtonDisabled, setVerifyButtonDisabled] = useState(false);

  useEffect(() => {
    let interval;

    if (timer > 0 && !otpInputDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setOtpInputDisabled(true);
      setVerifyButtonDisabled(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer, otpInputDisabled]);
 
  const startTimer = () => {
    setTimer(30); 
  };

  function generate_Otp() {
    let generatedOtp = '';
    const characters =
      '0123456789';

    for (let i = 0; i < 6; i++) {
      generatedOtp += characters
        .charAt(Math
          .floor(Math.random() * characters.length));
    }
    console.log(generatedOtp)
    setOtp(generatedOtp)
    setOtpInputDisabled(false);
    setVerifyButtonDisabled(false); 
    startTimer(); 
  }

  function otpInputHandler(e) {
    console.log('Entered Value',e);
    setOtpText(e)
  }

  function verify_otp_handler() {
    console.log(otp, otpText, otp === otpText)
    if (otp === otpText) {
      setVerificationResult('OTP is validation is Successful!!! Welcome to the application');
      setOtpInputDisabled(true); 
      setVerifyButtonDisabled(true); 

    } else {
      setVerificationResult('OTP is invalid');
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.Textfields}>Enter your name</Text>
      <StatusBar style="auto" />
      <TextInput style={styles.TextBoxcontainer} placeholder='Name' placeholderTextColor={'#cccccc'} / >
      <Text style={styles.Textfields}>Enter your phone number</Text>
      <TextInput style={styles.TextBoxcontainer} placeholder='10 digit Phone number' placeholderTextColor={'#cccccc'} />

      <View style={styles.Buttonstyle}>
        <Button onPress={() => { generate_Otp() }} title='Generate Otp' />
      </View>
      <View style={styles.Verify_otp}>
        <Text style={styles.Verify_otp_text}>Verify OTP</Text>
        <Text style={styles.Verify_otp_text }>{`Time remaining: ${timer} seconds`}</Text>
        <TextInput onChange={(e) => { otpInputHandler(e.nativeEvent.text) }} style={styles.verify_otp_box} placeholder='Enter your OTP' placeholderTextColor={'#cccccc'} disabled={otpInputDisabled}/>
        <View style={styles.Buttonstyle}>
          <Button onPress={() => { verify_otp_handler() }} title='Verify' disabled={verifyButtonDisabled}/>
        </View>
        <Text style={styles.otp_result_text}>{verificationResult}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 150,
    paddingHorizontal: 16,
    backgroundColor:'#1A0037',
  },
  TextBoxcontainer: {
    margin: 8,
    borderRadius: 5,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '80%',
    fontStyle: 'italic',
    color:'white'
  },
  Textfields: {
    paddingBottom: 20,
    paddingTop: 20,
    fontSize: 17,
    fontFamily: 'monospace',
    color:'white'
  },
  Buttonstyle: {
    paddingTop: 20,
    paddingBottom: 20,
    height: '25%'
  },
  Verify_otp: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  Verify_otp_text: {

    fontSize: 18,
    paddingBottom: 20,
    paddingTop: 0,
    color:'white'
  },
  verify_otp_box: {
    margin: 5,
    borderRadius: 5,
    paddingBottom: 10,
    borderWidth: 2,
    borderColor: '#cccccc',
    height: '16%',
    width: '100%',
    fontStyle: 'italic',
    color:'white'
  },
  otp_result_text:{
    fontSize : 15,
    color:'white',
    paddingTop:0
  }
});
