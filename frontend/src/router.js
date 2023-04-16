import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Analysis from "./routes/Analysis";
import News from "./routes/News";
import Portfolio from "./routes/Portfolio";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "news/",
				element: <News />,
			},
			{
				path: "analysis/",
				element: <Analysis />
			},
			{
				path: "portfolio/",
				element: <Portfolio />
			}
		]
	},
]);
