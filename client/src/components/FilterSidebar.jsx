// components/FilterSidebar.jsx
import { useState, useEffect } from "react";
import { Form, Button, Badge } from "react-bootstrap";

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
    <div className="p-3 border rounded bg-light shadow-sm">
      <h5 className="mb-3 text-primary">Filter</h5>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Skills</Form.Label>
        <div className="d-flex flex-wrap gap-2">
          {skillsList.map((skill) => (
            <Badge
              key={skill}
              bg={selectedSkills.includes(skill) ? "primary" : "secondary"}
              pill
              style={{ cursor: "pointer" }}
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Budget Range ($)</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control
            type="number"
            name="min"
            value={budgetRange.min}
            onChange={handleBudgetChange}
            placeholder="Min"
          />
          <Form.Control
            type="number"
            name="max"
            value={budgetRange.max}
            onChange={handleBudgetChange}
            placeholder="Max"
          />
        </div>
      </Form.Group>

      <Button variant="outline-secondary" size="sm" onClick={resetFilters}>
        Reset Filters
      </Button>
    </div>
  );
}
