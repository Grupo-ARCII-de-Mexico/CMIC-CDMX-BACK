import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import * as GP from 'generate-password'
@Injectable()
export class ZoomService {
  private apiKey = 'y93u0eTNT1CavNES450Jmg';
  private apiSecret = 'aX2F04zQvZLrVe4tV1bO3X0c71XfxLsZAyh3';
  private readonly zoomApiBaseUrl = 'https://api.zoom.us/v2';
  generateJWTToken() {
    const payload = {
      iss: this.apiKey,
      exp: Math.floor(Date.now() / 1000) + 3600,
    };
    const token = jwt.sign(payload, this.apiSecret);
    return token;
  }
 
  async createMeeting(pass: number = 0,title:string,start_time?:Date) {
    let password = null;
    if (pass === 1) {
      password =  GP.generate({
            length:8,
            numbers:true,
        })
    }
    const token = this.generateJWTToken();
    const url = 'https://api.zoom.us/v2/users/me/meetings';
    try {
      const response = await axios.post(
        url,
        {
          topic:title,
          type: 2,
          password,
          start_time
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );  
      return response.data;
    }catch(error) {
        console.log(error.response.data);
    }
    }


    async getMeetingInfo(meetingId: string) {
      const url = `${this.zoomApiBaseUrl}/meetings/${meetingId}`;
  
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${this.generateJWTToken()}`,
          },
        });
  
        return response.data;
      } catch (error) {
        throw new Error(`Error al obtener información de la reunión: ${error.response.data.message}`);
      }
    }

    async updateMeetingTime(meetingId: string) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(8, 0, 0, 0); // Establecer la hora de inicio a las 8:00 a.m.
  
      const endDatetime = new Date(tomorrow);
      endDatetime.setHours(16, 0, 0, 0); // Establecer la hora de finalización a las 4:00 p.m.
  
      const requestData = {
        start_time: tomorrow.toISOString(),
        end_time: endDatetime.toISOString(),
      };
  
      try {
        const response = await axios.patch(`${this.zoomApiBaseUrl}/meetings/${meetingId}`, requestData, {
          headers: {
            'Authorization': `Bearer ${this.generateJWTToken()}`,
          },
        });
  
        return response.data;
      } catch (error) {
        throw new Error(`Error al actualizar la hora de inicio y finalización de la reunión: ${error.response.data.message}`);
      }
    }


}