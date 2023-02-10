import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Paper,
} from "@mui/material";
import React, { useState } from "react";

type ItemType = {
  id: number;
  title: string;
};

type BoardType = {
  id: number;
  title: string;
  items: ItemType[];
};

const DragAndDrop = () => {
  const [boards, setBoars] = useState<BoardType[]>([
    {
      id: 1,
      title: "sdelat",
      items: [
        {
          id: 1,
          title: "1",
        },
        {
          id: 2,
          title: "2",
        },
      ],
    },
    {
      id: 2,
      title: "LSDfsad",
      items: [
        {
          id: 4,
          title: "4",
        },
        {
          id: 5,
          title: "5",
        },
      ],
    },
  ]);
  const [currentBoard, setCurrentBoard] = useState<any>(null);
  const [currentItem, setCurrentItem] = useState<any>(null);

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
  }

  function dragLeavehandler(e: React.DragEvent<HTMLDivElement>): void {}

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>): void {}

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>, board: BoardType, item: ItemType): void {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>, board: BoardType, item: ItemType): void {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setCurrentBoard(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }
  function dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: BoardType): void {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setCurrentBoard(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }

  return (
    <div>
      <Box sx={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {boards.map((board) => (
          <Box
            component={"div"}
            bgcolor="#fff"
            sx={{ width: "10rem", height:"20rem" }}
            onDrop={(e) => dropCardHandler(e, board)}
            onDragOver={(e) => dragOverHandler(e)}
            key={board.id}
            title={board.title}
          >
            {board.items.map((item) => (
              <div
                key={item.id}
                className="item"
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeavehandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
                draggable
              >
                <ListItemButton sx={{ cursor: "grab", bgcolor: "#fff" }}>{item.title}</ListItemButton>
              </div>
            ))}
          </Box>
        ))}
      </Box>
    </div>
  );
};

type MyCardProps = {
  title?: string;
  children?: React.ReactNode | React.ReactNode[];
};



export default DragAndDrop;
