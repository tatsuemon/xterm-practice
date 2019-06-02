import javafx.application.Application;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.layout.StackPane;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.event.EventHandler;
import javafx.stage.WindowEvent;

public class WebBrowser extends Application{

  public static void main(String[] args) {
    launch(args);
  }

  @Override
  public void start(Stage primaryStage) {
    primaryStage.setTitle("WebBrowser");

    StackPane root = new StackPane();

    WebView browser = new WebView();
    WebEngine webEngine = browser.getEngine();
    webEngine.load("http://127.0.0.1:8800/");

    root.getChildren().add(browser);
    Scene scene = new Scene(root, 800, 600);

    primaryStage.setScene(scene);
    primaryStage.show();
  }

}