import { useEffect, useState } from "react";
import Papa from "papaparse";
import './grid.css'


function grid(){
    //data contains all the data of the HiringExamStoreProducts.csv file
    const [data,setData]=useState<Record<string, string>[]>([]);

    //imageURL contains only URL of images in HiringExamStoreProducts.csv file
    const [imageURL,setImageURL]=useState<string[]>([]);

    //activeIndex contains the index of card of grid that pressed
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    //selectedColor contains the selected color on the popup
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    //selectedColorIndex contains the index of the selected color on the popup and it will be 0 or 1
    const [selectedColorIndex, setSelectedColorIndex] = useState<number | -1>(-1);


    const sizes = ["XS", "S", "M", "L","XL","2XL"];

    //selected contains the selected size on the popup
    const [selected, setSelected] = useState<string>("");

    //to make sure if the Dropdown List on the popup if open or not
    const [open, setOpen] = useState<boolean>(false);

    //put the selected size from the Dropdown List on selected variable
    const handleSelect = (size: string) => {
        setSelected(size);
        setOpen(false);
    };


    //to put the index of pressed card of the grin into ActiveIndex Variable
    const handleClick = (index: number) => {
        setActiveIndex(index);
    };

    //to put the selected color from the popup into SelectedColor Variable
    //and put the index of the selected color into SelectedColorIndex Variable
    const handleSelectedColorIndex =(AcIndex:number,colorIndex:number)=>{
        if(colorIndex===0)
            setSelectedColor(data[8*indexOfImages[AcIndex]]['Option2 Value']);
        else
            setSelectedColor(data[(8*indexOfImages[AcIndex])+1]['Option2 Value'])

        setSelectedColorIndex(colorIndex);
    }

    //index of needed images in imageURL array that contains all URL from the File
    //depends on the needed website
    const indexOfImages=[10,3,6,14,18,13];
    

    const Title=[
        "Orange Wide Leg",
        "Tailored Jacket",
        "Accordion Pleated Dress",
        "Green Trench Coat",
        "Tennis Blue T-Shirt",
        "Long Sleeve Tennis Top"
    ];

    useEffect(()=>{
        fetch("/HiringExamStoreProducts.csv")
        .then((res)=>res.text())
        .then((text)=>{
        const result= Papa.parse<Record<string, string>>(text,{
            header:true
        });

        const links: string[] = [];
        const indexes: number[] = [];

        result.data.forEach((row, i) => {
            const link = row["Image Src"];
            if (link && link.trim() !== "") {
                links.push(link);     
                indexes.push(i);      
            }
        });

        setData(result.data);
        setImageURL(links);
        });
    },[]);

    return(
        <div>
            <h1 style={{paddingLeft:95}}>Tisso Vison in the wild</h1>
            <div className='container'>
                
                {indexOfImages.map((val,i)=>{
                    return(
                    <div className="card">
                        <img 
                        key={i}
                        src={imageURL[val]}
                        alt="clothes"
                        />
                        <button className={`plus-btn pos-${i}`} onClick={()=>handleClick(i)} >
                            +
                        </button>
                        {activeIndex !== null && (
                            <div className="focus-overlay">
                                <div className="popup">
                                    <span className="close" onClick={() => {
                                        setActiveIndex(null),
                                        setSelectedColorIndex(-1),
                                        setSelectedColor("")}}>×</span>
                                    <img src={imageURL[indexOfImages[activeIndex]]} alt={`Image ${indexOfImages[activeIndex]}`} />
                                    <p className="title">{Title[activeIndex]}</p>
                                    <p className="price">980,00€</p>
                                    <p className="description">This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.</p>
                                    <div className="color">
                                        <p>Color</p>
                                        {selectedColorIndex!== -1 &&(
                                            <div
                                                className="highlight"
                                                style={{ transform: `translateX(${selectedColorIndex * 100}%)` }}
                                            />
                                        )}
                                        <button key={data[8*indexOfImages[activeIndex]]['Option2 Value']}
                                        onClick={()=>handleSelectedColorIndex(activeIndex,0)}
                                        className={`color-btn ${selectedColor === data[8*indexOfImages[activeIndex]]['Option2 Value'] ? "active" : ""}`}>
                                            {data[8*indexOfImages[activeIndex]]['Option2 Value']}
                                        </button>
                                        <button 
                                        key={data[(8*indexOfImages[activeIndex])+1]['Option2 Value']}
                                        onClick={()=>handleSelectedColorIndex(activeIndex,1)}
                                        className={`color-btn ${selectedColor === data[(8*indexOfImages[activeIndex])+1]['Option2 Value'] ? "active" : ""}`}>
                                            {data[(8*indexOfImages[activeIndex])+1]['Option2 Value']}
                                        </button>
                                    </div>

                                    <div className="dropdown">
                                        <p>Sizes</p>
                                        <button className="dropdown-btn" onClick={() => setOpen(!open)}>
                                            {selected || "Choose your size"}
                                            <span className={`DropDown-arrow ${open ? "up" : "down"}`}></span>
                                        </button>
                                        {open && (
                                            <ul className="dropdown-list">
                                            {sizes.map((size) => (
                                                <li
                                                key={size}
                                                className="dropdown-item"
                                                onClick={() => handleSelect(size)}
                                                >
                                                {size}
                                                </li>
                                            ))}
                                            </ul>
                                        )}
                                    </div>


                                    <button className="add-to-cart-btn">
                                        <span className="addTitle">ADD TO CART</span> <span className="right-arrow">→</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    )
                })}
            </div>
      </div>
    );
}

export default grid;