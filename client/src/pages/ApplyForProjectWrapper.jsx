// src/pages/ApplyForProjectWrapper.jsx
import { useParams } from "react-router-dom";
import ApplyForProject from "../components/ApplyForProject";

export default function ApplyForProjectWrapper() {
  const { projectId } = useParams();
  return <ApplyForProject projectId={projectId} />;
}
