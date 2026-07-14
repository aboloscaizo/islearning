import { Injectable } from "@nestjs/common";
import { SessionStatus } from "@prisma/client";
import { SessionState } from "./session-state.interface";
import { ActiveSessionState } from "./active-session.state";
import { RevokedSessionState } from "./revoked-session.state";
import { ExpriedSessionState } from "./expried-session.state";

@Injectable()
export class SessionStateFactory {
    create(status: SessionStatus): SessionState {
        switch (status) {
            case SessionStatus.ACTIVE:
                return new ActiveSessionState();
            case SessionStatus.REVOKED:
                return new RevokedSessionState();
            case SessionStatus.EXPIRED:
                return new ExpriedSessionState();
            default:
                throw new Error(`Unknown session status: ${status}`);
        }
    }
}
