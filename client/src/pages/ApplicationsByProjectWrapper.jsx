// src/pages/ApplicationsByProjectWrapper.jsx
import { useParams } from "react-router-dom";
import ApplicationsByProject from "../components/ApplicationsByProject";

export default function ApplicationsByProjectWrapper() {
  const { projectId } = useParams();
  return <ApplicationsByProject projectId={projectId} />;
}
