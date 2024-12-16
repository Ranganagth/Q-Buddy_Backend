// location.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from "@nestjs/websockets";
import { Server } from "socket.io";
import { LocationService } from "./location.service";

@WebSocketGateway({
  cors: {
    origin: "*", // Adjust to your front-end domain
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
})
export class LocationGateway {
  @WebSocketServer() server: Server;
  private users: Map<string, string> = new Map();

  constructor(private locationService: LocationService) {}

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    const userId = this.users.get(client.id);
    if (userId) {
      this.users.delete(client.id);
      console.log(`User ${userId} disconnected`);
    }
  }

  @SubscribeMessage("updateLocation")
  async handleLocationUpdate(client: any, data: { userId: string; location: { lat: number; lng: number } }) {
    await this.locationService.updateUserLocation(data.userId, data.location);
    const allLocations = await this.locationService.getAllUserLocations();
    this.server.emit("locationsUpdate", allLocations);
  }

  @SubscribeMessage("registerUser")
  handleRegisterUser(client: any, userId: string) {
    this.users.set(client.id, userId);
    this.locationService.getAllUserLocations().then((locations) => {
      client.emit("locationsUpdate", locations);
    });
  }
}
