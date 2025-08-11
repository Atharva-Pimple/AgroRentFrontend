import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Container, Row, Col, Image } from "react-bootstrap";
import { getAllEquipment, deleteEquipmentById } from "../services/EquipmentService";
import { toast } from "react-toastify";

export default function Equipment() {
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all equipment
  const fetchEquipments = async () => {
    try {
      setLoading(true);
      const response = await getAllEquipment();
      setEquipmentList(response.data);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      toast.error("Failed to load equipment data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  // Delete equipment by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this equipment?")) return;
    try {
      await deleteEquipmentById(id);
      toast.success("Equipment deleted successfully!");
      setEquipmentList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete equipment");
    }
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Equipment List</h1>
        </Col>
      </Row>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : equipmentList.length === 0 ? (
        <p className="text-center text-muted">No equipment available.</p>
      ) : (
        <Row>
          <Col>
            <div className="table-responsive">
              <Table striped bordered hover responsive>
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Rental Price</th>
                    <th>Available</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {equipmentList.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-bold">{item.name}</td>
                      <td style={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.description}
                      </td>
                      <td>
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          thumbnail
                          style={{ width: "70px", height: "70px", objectFit: "cover" }}
                        />
                      </td>
                      <td>₹{item.rentalPrice}</td>
                      <td>
                        {item.available ? (
                          <span className="text-success fw-semibold">Yes</span>
                        ) : (
                          <span className="text-danger fw-semibold">No</span>
                        )}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}
