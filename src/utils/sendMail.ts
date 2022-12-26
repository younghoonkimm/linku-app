import { Alert } from "react-native";
import Mailer from "react-native-mail";

export const handleEmail = () => {
  Mailer.mail(
    {
      subject: "링쿠앱 문의",
      recipients: ["fondue.2022@gmail.com"],
      body: "<b>A Bold Body</b>",
      isHTML: true,
    },
    (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {
            text: "Ok",
            onPress: () => console.log("이메일 전송 완료"),
          },
          {
            text: "Cancel",
            onPress: () => console.log("이메일 발송 에러"),
          },
        ],
        { cancelable: true }
      );
    }
  );
};
