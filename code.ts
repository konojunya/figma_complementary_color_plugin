figma.showUI(__html__);

const selection = figma.currentPage.selection[0];

type HasFillNode =
  | ComponentNode
  | InstanceNode
  | VectorNode
  | StarNode
  | LineNode
  | EllipseNode
  | PolygonNode
  | RectangleNode
  | TextNode;

type Color = {
  r: number;
  g: number;
  b: number;
};

type PostMessagePayload = {
  select: Color;
};

function hasFillsProperty(selection: SceneNode) {
  switch (selection.type) {
    case "COMPONENT":
    case "ELLIPSE":
    case "INSTANCE":
    case "LINE":
    case "POLYGON":
    case "RECTANGLE":
    case "STAR":
    case "TEXT":
    case "VECTOR":
      return true;
    default:
      return false;
  }
}

function sendToMessage(payload: PostMessagePayload) {
  figma.ui.postMessage(payload, { origin: "*" });
}

if (hasFillsProperty(selection)) {
  const paint = (selection as HasFillNode).fills[0] as Paint;

  if (paint.type === "SOLID") {
    sendToMessage({
      select: {
        r: Math.round(paint.color.r * 255),
        g: Math.round(paint.color.g * 255),
        b: Math.round(paint.color.b * 255),
      },
    });
  }
}
