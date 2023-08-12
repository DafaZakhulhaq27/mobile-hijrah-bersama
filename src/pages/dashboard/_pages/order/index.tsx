import { WebView } from "react-native-webview";
import ContentWrapper from "../../../../components/contentWrapper";
import { OrderRouteProps } from "../../../../navigation/types";

export default function OrderScreen({ route }: OrderRouteProps) {
  return (
    <ContentWrapper>
      <WebView
        source={{ uri: route.params.redirect_url }}
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={true}
        domStorageEnabled={true}
        cacheEnabled={true}
        allowFileAccessFromFileURLs={true}
        allowFileAccess={true}
        cacheMode="LOAD_NO_CACHE"
      />
    </ContentWrapper>
  );
}
