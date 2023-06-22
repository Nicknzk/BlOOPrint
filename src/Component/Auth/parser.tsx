import * as acorn from "acorn-loose";
import { Box } from "../NewProjectTemplate";

interface ClassInfo {
  methods: string[];
  attributes: string[];
  dependencies: string[];
}

interface ClassData {
  className: string;
  methods: string[];
  attributes: string[];
  dependencies: string[];
}

const Parser = ({ onUpload }: { onUpload: (data: Box[]) => void }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const parsedData: Box[] = []; // Array to store parsed data

      const readFile = (file: File) => {
        return new Promise<void>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const sourceCode = e.target?.result;
            const extractedInfo = extractInfo(sourceCode as string);
            console.log("file read", extractedInfo);
            parsedData.push(...extractedInfo); // Store parsed data
            resolve();
          };
          reader.onerror = (e) => {
            console.error("File reading error:", e.target?.error);
            reject();
          };
          reader.readAsText(file);
        });
      };

      const readAllFiles = async () => {
        for (let i = 0; i < files.length; i++) {
          try {
            await readFile(files[i]);
          } catch (error) {
            // Handle error if necessary
          }
        }

        onUpload(parsedData); // Call onUpload with all the parsed data
      };

      readAllFiles();
    }
  };

  const extractInfo = (sourceCode: string) => {
    const code = sourceCode;
    const ast = acorn.parse(code);

    const classes: { [className: string]: ClassInfo } = {};

    traverseAST(ast, {
      enter(node: any, parent: any) {
        if (node.type === "ClassDeclaration") {
          const className = (node.id as any).name;
          const methods: string[] = [];
          const attributes: string[] = [];
          const dependencies: string[] = [];

          node.body.body.forEach((classMember: any) => {
            if (classMember.type === "MethodDefinition") {
              const methodName = (classMember.key as any).name;
              methods.push(methodName);
            } else if (classMember.type === "PropertyDefinition") {
              const attributeName = (classMember.key as any).name;
              attributes.push(attributeName);
            }
          });

          if (parent && parent.type === "Program") {
            dependencies.push(...findDependencies(parent));
          }

          classes[className] = { methods, attributes, dependencies };
        }
      },
    });

    const classData: ClassData[] = Object.entries(classes).map(
      ([className, classInfo]) => ({
        className,
        methods: classInfo.methods,
        attributes: classInfo.attributes,
        dependencies: classInfo.dependencies,
      })
    );

    const compressedOutput = compressOutput(classData);
    console.log(compressedOutput); //im leaving this line to prevent error from not using

    const shortenDependencies = (classes: ClassData[]) => {
      return classes.map((box) => {
        box.dependencies = box.dependencies.map((dependency) => {
          return dependency.substring(dependency.lastIndexOf("/") + 1);
        });
        return box;
      });
    };
    const newCompressedOutput = shortenDependencies(classData);
    console.log(newCompressedOutput);

    //console.log(classData);
    const parsedClassData: Box[] = newCompressedOutput.map((box) => ({
      id: Date.now() * Math.floor(Math.random() * 1000000),
      name: box.className,
      dependencies: box.dependencies,
      methods:[],
      attributes:[],
    }));

    return parsedClassData;
  };

  const findDependencies = (node: any) => {
    const dependencies: string[] = [];

    traverseAST(node, {
      enter(node: any) {
        if (node.type === "ImportDeclaration") {
          const moduleName = node.source.value;
          dependencies.push(moduleName);
        }
      },
    });

    return dependencies;
  };

  const traverseAST = (node: any, visitor: any) => {
    const { enter, leave } = visitor;

    function traverse(node: any, parent: any) {
      if (enter) {
        enter(node, parent);
      }

      for (const key in node) {
        if (Object.prototype.hasOwnProperty.call(node, key)) {
          const child = node[key];
          if (typeof child === "object" && child !== null) {
            if (Array.isArray(child)) {
              child.forEach((n) => {
                traverse(n, node);
              });
            } else {
              traverse(child, node);
            }
          }
        }
      }

      if (leave) {
        leave(node, parent);
      }
    }

    traverse(node, null);
  };

  const compressOutput = (classes: ClassData[]) => {
    const compressedOutput: { [className: string]: ClassInfo } = {};

    for (const classData of classes) {
      const { className, methods, attributes, dependencies } = classData;

      const compressedInfo: ClassInfo = {
        methods: methods.filter(isUserDefinedMethod),
        attributes: attributes.filter(isUserDefinedAttribute),
        dependencies: dependencies.filter(isUserDefinedDependency),
      };

      compressedOutput[className] = compressedInfo;
    }

    return compressedOutput;
  };

  const isUserDefinedMethod = (methodName: string) => {
    // Filter condition for user-defined methods
    return methodName !== "constructor" && !methodName.startsWith("_");
  };

  const isUserDefinedAttribute = (attributeName: string) => {
    // Filter condition for user-defined attributes
    return !attributeName.startsWith("_");
  };

  const isUserDefinedDependency = (dependencyName: string) => {
    // Filter condition for user-defined dependencies
    return !dependencyName.startsWith("react");
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
    </div>
  );
};

export default Parser;
