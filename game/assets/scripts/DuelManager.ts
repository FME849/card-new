import Engine from '@metacraft/murg-engine';
import { _decorator, Component, EventMouse, Node, UIOpacity } from 'cc';

import { sendCardSummon } from './network/instance';
import {
	raiseCardAnimate,
	raisePreviewAnimate,
	simpleMove,
} from './tween/card';
import { cardIdFromNode, getMyGround } from './util/helper';
import { getGroundExpos, getHandExpos } from './util/layout';
import { system } from './util/system';

const { ccclass } = _decorator;
const {
	selectHand,
	selectGround,
	getCard,
	getFirstEmptyLeft,
	getFirstEmptyRight,
} = Engine;
const NodeEvents = Node.EventType;

@ccclass('DuelManager')
export class DuelManager extends Component {
	previewingLeft = false;
	previewingRight = false;

	start(): void {
		system.globalNodes.duel = this.node;
		system.globalNodes.cardPreview = this.node.getChildByPath('Card Preview');

		this.node.on(NodeEvents.MOUSE_UP, this.onMouseUp.bind(this));
		this.node.on(NodeEvents.MOUSE_MOVE, this.onMouseMove.bind(this));
	}

	onUnitPreview(): void {
		const previewNode = system.globalNodes.unitTemplate;
		const expoPositions = getGroundExpos(system.globalNodes.playerGround);

		if (this.previewingLeft) {
			const myGround = selectGround(system.duel, system.playerIds.me);
			const summonIndex = getFirstEmptyLeft(myGround);
			previewNode.setPosition(expoPositions[summonIndex]);
		} else if (this.previewingRight) {
			const myGround = selectGround(system.duel, system.playerIds.me);
			const summonIndex = getFirstEmptyRight(myGround);
			previewNode.setPosition(expoPositions[summonIndex]);
		} else {
			previewNode.setPosition(120, 680);
		}
	}

	onCardDrag(e: EventMouse): void {
		const { x, y } = e.getUILocation();
		const zonePosition = system.globalNodes.summonZone.getWorldPosition();
		system.activeCard?.setWorldPosition(x, y, 0);

		if (y > zonePosition.y) {
			if (x > zonePosition.x && !this.previewingRight) {
				this.previewingLeft = false;
				this.previewingRight = true;
				this.onUnitPreview();
			} else if (x < zonePosition.x && !this.previewingLeft) {
				this.previewingLeft = true;
				this.previewingRight = false;
				this.onUnitPreview();
			}
		} else {
			this.previewingLeft = false;
			this.previewingRight = false;
			this.onUnitPreview();
		}
	}

	onCardDrop(e: EventMouse): void {
		const { x, y } = e.getUILocation();
		const zonePosition = system.globalNodes.summonZone.getWorldPosition();
		const cardId = cardIdFromNode(system.activeCard);
		const hand = selectHand(system.duel, system.playerIds.me);
		const indexInHand = hand.indexOf(cardId);
		const expoPositions = getHandExpos(
			system.globalNodes.playerHand,
			hand.length,
		);

		if (y < zonePosition.y) {
			simpleMove(system.activeCard, expoPositions[indexInHand]);
		} else {
			if (x > zonePosition.x) {
				sendCardSummon(cardId, getFirstEmptyRight(getMyGround()));
			} else {
				sendCardSummon(cardId, getFirstEmptyLeft(getMyGround()));
			}
		}

		system.globalNodes.unitTemplate.setPosition(120, 680);
	}

	onMouseUp(e: EventMouse): void {
		if (system.dragging) {
			this.onCardDrop(e);
		}

		system.dragging = false;
		system.activeCard = null;
	}

	onMouseMove(e: EventMouse): void {
		if (system.dragging && system.activeCard) {
			this.onCardDrag(e);
		} else if (system.duel && system.playerIds) {
			const handCardIds = selectHand(system.duel, system.playerIds.me);
			const handPosition = system.globalNodes.playerHand.getWorldPosition();
			const mousePosition = e.getUILocation();
			let chosen: { node: Node; distance: number; cardId: string };

			/* <- Mouse moving near player Hand area */
			if (mousePosition.y < handPosition.y + 106) {
				for (let i = 0; i < handCardIds.length; i += 1) {
					const cardId = handCardIds[i];
					const card = system.cardRefs[cardId];
					if (card) {
						const cardPosition = card.getWorldPosition();
						// if (cardPosition.y < handPosition.y + 10) {
						const distance = Math.abs(mousePosition.x - cardPosition.x);
						if (distance < (chosen?.distance || 70)) {
							chosen = { node: card, cardId, distance };
						}
						// }
					}
				}
			}

			if (chosen) {
				if (chosen.node.uuid !== system.activeCard?.uuid) {
					if (system.activeCard) {
						this.onCardLeave(system.activeCard);
					}

					this.onCardHover(chosen.node, chosen.cardId);
					system.activeCard = chosen.node;
				}
			} else if (system.activeCard) {
				this.onCardLeave(system.activeCard);
				system.activeCard = null;
			}
		}
	}

	onCardHover(node: Node, cardId: string): void {
		const card = getCard(system.duel.cardMap, cardId);

		system.globalNodes.cardPreview
			.getChildByPath('Card')
			.emit('data', { card });
		system.globalNodes.cardPreview.setPosition(node.position.x, -180);
		raiseCardAnimate(node, 100);
		raisePreviewAnimate(system.globalNodes.cardPreview);
		node.getComponent(UIOpacity).opacity = 20;
	}

	onCardLeave(node: Node): void {
		raiseCardAnimate(node, 0);
		system.globalNodes.cardPreview.setPosition(190, 740);
		node.getComponent(UIOpacity).opacity = 255;
	}
}
