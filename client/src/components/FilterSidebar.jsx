import { useState, useEffect } from "react";
import { Form, Button, Badge } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

export default function FilterSidebar({ skillsList = [], onFilterChange }) {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [budgetRange, setBudgetRange] = useState({ min: "", max: "" });

  useEffect(() => {
    onFilterChange({ selectedSkills, budgetRange });
  }, [selectedSkills, budgetRange]);

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleBudgetChange = (e) => {
    const { name, value } = e.target;
    setBudgetRange((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setSelectedSkills([]);
    setBudgetRange({ min: "", max: "" });
  };

  return (
    <div className="p-4 border rounded-4 bg-white shadow-sm position-sticky top-0">
      <div className="d-flex align-items-center mb-4">
        <FaFilter className="me-2 text-dark" />
        <h5 className="mb-0 fw-bold text-dark">Filter Projects</h5>
      </div>

      {/* Skill Selection */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold text-secondary">Skills</Form.Label>
        <div className="d-flex flex-wrap gap-2">
          {skillsList.map((skill) => (
            <Badge
              key={skill}
              bg={selectedSkills.includes(skill) ? "primary" : "light"}
              text={selectedSkills.includes(skill) ? "light" : "dark"}
              pill
              className="px-3 py-2 border"
              style={{
                cursor: "pointer",
                fontSize: "0.85rem",
                transition: "0.2s ease-in-out",
                borderColor: selectedSkills.includes(skill) ? "#0d6efd" : "#dee2e6",
              }}
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </Form.Group>

      {/* Budget Range */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold text-secondary">Budget Range (₹)</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control
            type="number"
            name="min"
            value={budgetRange.min}
            onChange={handleBudgetChange}
            placeholder="Min"
            className="rounded-3"
          />
          <Form.Control
            type="number"
            name="max"
            value={budgetRange.max}
            onChange={handleBudgetChange}
            placeholder="Max"
            className="rounded-3"
          />
        </div>
      </Form.Group>

      {/* Reset Button */}
      <div className="d-grid">
        <Button
          variant="outline-secondary"
          size="sm"
          className="rounded-3 fw-medium"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
