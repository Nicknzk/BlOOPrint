
import React from 'react'; 
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';


interface Box {
  id: number;
  name: string;
  dependencies: string[];
  methods: string[];
  attributes:string[];
}


export default function ProjectDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const boxesString = searchParams.get("boxes");  
  const boxes = boxesString ? JSON.parse(decodeURIComponent(boxesString)) : [];

  console.log(boxes);


  const BoxList: React.FC<{ boxes: Box[] }> = ({ boxes }) => {
    return (
      <ul className="box-list">
      {boxes.map((box) => (
        <li key={box.id} className="box">
          <h3 className="box-title">{box.name}</h3>
          
          <section className="methods">
            <h4>Methods:</h4>
            <ul className="method-list">
              {/* Render methods here */}
            </ul>
          </section>
          
          <section className="attributes">
            <h4>Attributes:</h4>
            <ul className="attribute-list">
              {/* Render attributes here */}
            </ul>
          </section>
          
          <section className="dependencies">
            <h4>Dependencies:</h4>
            <ul className="dependency-list">
              {/* Render dependencies here */}
            </ul>
          </section>
        </li>
      ))}
    </ul>
    );
  };
  
  return (
    <>
  <h1>Project Details</h1>
  <BoxList boxes={boxes}/>
  <nav>
  <Link
          className="NewProjectTemplate"
          to={{
            pathname: "/NewProjectTemplate",
            search: `?boxes=${encodeURIComponent(JSON.stringify(boxes))}`, // Pass boxes as a search parameter
          }}
        >
          Back to Project Template
        </Link>
      </nav>
  </>
  );
}




