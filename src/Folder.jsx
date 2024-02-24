import { useState } from "react";
import UpdateData from "./utils/UpdateData";
import folderData from './data/folderData.json';

const Folder = ({ data, setData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInput, setShowInput] = useState({
    visble: false,
    isFolder: null,
  });
  const [inputValue, setInputValue] = useState('');

  const hanldeAddFileOrFolder = (isFolder) => {
    setShowInput({
      visble: true,
      isFolder: isFolder,
    });
  };

  if (data.type === "folder") {
    return (
      <div
        style={{
          padding: "10px",
          margin: "10px",
          borderLeft: "2px dotted black",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 onClick={() => setIsOpen(!isOpen)}>📁{data.name}</h2>
          <button
            onClick={() => hanldeAddFileOrFolder(true)}
            style={{
              margin: "5px",
              width: "50px",
              height: "20px",
              borderRadius: "20%",
              border: "none",
            }}
          >
            Folder+
          </button>
          <button
            onClick={() => hanldeAddFileOrFolder(false)}
            style={{
              margin: "5px",
              width: "50px",
              height: "20px",
              borderRadius: "20%",
              border: "none",
            }}
          >
            File+
          </button>
        </div>
        {showInput.visble && (
          <div>
            <span>{showInput.isFolder ? "📁" : "🗄️"}</span>
            <input
              autoFocus
              onChange={e => setInputValue(e.target.value)}
              value={inputValue}
              onKeyDown={(e) => {

                if(e.key === 'Enter' && (inputValue===''))
                {
                  setShowInput({ ...showInput, visble: false })
                }
                else if (e.key === 'Enter' && (inputValue!=='')) {
                  const newdata = UpdateData(folderData,data.id,inputValue,showInput.isFolder);
                  if(newdata==='alreadyexists')
                  {
                    alert('Already exists',inputValue);
                    setShowInput({ ...showInput, visble: false })
                    setInputValue('');
                  }
                  else
                  {
                    setData(newdata);
                    setShowInput({ ...showInput, visble: false })
                    setInputValue('');
                    setIsOpen(true);
                  }

                }

              }}
              onBlur={() => {
                if(inputValue==='')
                {
                  setShowInput({ ...showInput, visble: false })
                }
                else {
                  const newdata = UpdateData(folderData,data.id,inputValue,showInput.isFolder);
                  if(newdata==='alreadyexists')
                  {
                    alert('Already exists',inputValue);
                    setShowInput({ ...showInput, visble: false })
                    setInputValue('');
                  }
                  else
                  {
                    setData(newdata);
                    setShowInput({ ...showInput, visble: false })
                    setInputValue('');
                    setIsOpen(true);
                  }
                }
                
              }}
            />
          </div>
        )}

        {isOpen &&
          data.children.map((child) => (
            <Folder key={child.name+child.type} data={child} setData={setData}/>
          ))}
      </div>
    );
  }
  return <h2>🗄️{data.name}</h2>;
};

export default Folder;
