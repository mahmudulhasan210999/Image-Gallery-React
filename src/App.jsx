import React, { useState } from "react";
import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import img3 from './assets/3.jpg';
import img4 from './assets/4.jpg';
import img5 from './assets/5.jpg';
import img6 from './assets/6.jpg';
import img7 from './assets/7.jpg';
import img8 from './assets/8.jpg';
import img9 from './assets/9.jpg';
import img10 from './assets/10.jpg';
import img11 from './assets/11.jpg';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move
} from "react-grid-dnd";
import "./App.css";

function App() {
  const [items, setItems] = React.useState({
    images: [
      { id: 1, image: img1 },
      { id: 2, image: img2 },
      { id: 3, image: img3 },
      { id: 4, image: img4 },
      { id: 5, image: img5 },
      { id: 6, image: img6 },
      { id: 7, image: img7 },
      { id: 8, image: img8 },
      { id: 9, image: img9 },
      { id: 10, image: img10 },
      { id: 11, image: img11 }
    ],
  });

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    if (targetId) {
      const result = move(
        items[sourceId],
        items[targetId],
        sourceIndex,
        targetIndex
      );
      return setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1]
      });
    }

    const result = swap(items[sourceId], sourceIndex, targetIndex);
    return setItems({
      ...items,
      [sourceId]: result
    });
  }

  const [selectItems, setSelectItems] = useState([])

  const select = (e, item) => {
    if (e.target.checked) {
      setSelectItems([...selectItems, item])
    } else {
      const temp = selectItems.filter(i => i.id !== item.id)
      setSelectItems(temp)
    }
  }
  const delete_items = () => {
    const temp_data = items.images.filter(item1 =>
      !selectItems.some(item2 => item2.id === item1.id)
    );
    setItems({
      ...items,
      images: temp_data
    })
    setSelectItems([])
  }

  return (
    <div className="flex justify-center items-center h-[100vh] flex-col w-[480px]">
      <div className="w-full flex flex-col justify-center items-center bg-white rounded-md shadow-md">
        <div className="w-full p-4 border-b">
          {
            selectItems.length > 0 ? < div className="flex justify-between items-center">
              <div className="flex gap-2">
                <input onChange={() => setSelectItems([])} checked={selectItems.length > 0} type="checkbox" />
                <p className="font-semibold text-gray-600 text-lg">{selectItems.length} Files Selected</p>
              </div>
              <p className="text-red-600" onClick={delete_items}>Delete Files</p>
            </div> : <p className="font-semibold text-gray-600 text-lg">Image Gallery</p>
          }
        </div>
        <GridContextProvider onChange={onChange}>
          <div className="w-full p-4">
            <GridDropZone style={{
              height: `${Math.ceil(items.images.length / 4) * 100}px`
            }}
              id="images"
              boxesPerRow={4}
              rowHeight={100}
            >
              {items.images.map(item => (
                <GridItem key={item.id}>
                  <div className="grid-item border border-gray-200">
                    <div style={{
                      backgroundImage: `url(${item.image})`,
                      marginRight: '2px'
                    }} className="grid-item-content">
                      <div className={`item ${selectItems.some(s => s.id === item.id) ? 'show_shadow' : ''}`}></div>
                    </div>
                    <input checked={selectItems.some(s => s.id === item.id)} className={selectItems.some(s => s.id === item.id) ? 'show input checkbox' : 'checkbox input'} onChange={(e) => select(e, item)} id={item.id} type="checkbox" />
                  </div>
                </GridItem>
              ))}
            </GridDropZone>
          </div>
        </GridContextProvider>
      </div>
    </div >
  );
}
export default App


