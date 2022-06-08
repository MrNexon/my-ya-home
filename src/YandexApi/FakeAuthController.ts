import { Request, Response } from 'express';
import { AuthQueryDto } from './AuthQueryDto';
import axios from 'axios';
import * as crypto from 'crypto';

export class FakeAuthController {
  public static fakeAuth(request: Request, response: Response) {
    const query: AuthQueryDto = <any>request.query;
    const code = crypto.randomBytes(16).toString('hex');
    console.log(`Fake auth user id ${query.client_id}`);

    const redirectUrl = axios.getUri({
      url: query.redirect_uri,
      params: {
        state: query.state,
        client_id: query.client_id,
        scope: query.scope,
        code: code,
      },
    });

    response.setHeader('Refresh', `2; url=${redirectUrl}`);
    response.write('Auth');
    response.end();
  }

  public static getToken(request: Request, response: Response) {
    const token = crypto.randomBytes(32).toString('hex');
    response.json({
      access_token: token,
    });
    response.end();
  }

  public static success(request: Request, response: Response) {
    response.write('ok');
    response.end();
  }
}
